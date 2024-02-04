const jwt = require("jsonwebtoken");

const verifyTokenAndRoles = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
      return res
        .status(403)
        .json("C'è bisogno di un token per l'autorizzazione.");

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
      req.user = decoded;

      if (requiredRoles.length) {
        // Controlla se l'utente i ruoli richiesti
        const hasRequiredRole = (requiredRoles || []).every((role) =>
          (req.user.roles || []).includes(role)
        );
        if (!hasRequiredRole) {
          return res
            .status(403)
            .json("Accesso negato. Permessi insufficienti.");
        }
      }
    } catch (err) {
      return res.status(401).json("Token invalido.");
    }
    next();
  };
};

module.exports = verifyTokenAndRoles;
