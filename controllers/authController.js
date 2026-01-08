// controllers/authController.js

/**
 * This controller is ONLY for:
 * - Checking who is currently logged in
 * - Logging out (clearing cookie)
 *
 * It does NOT:
 * - Create JWT
 * - Touch database
 * - Handle login/register
 */

// ---------------------------------------
// GET CURRENT LOGGED-IN USER
// ---------------------------------------
exports.getMe = (req, res) => {
  /**
   * At this point:
   * authenticateToken middleware has already run
   * and injected decoded JWT into req.user
   *
   * Example:
   * req.user = {
   *   userId: "65a9f3...",
   *   role: "patient" | "doctor"
   * }
   */

  res.status(200).json({
    user: {
      id: req.user.userId,
      role: req.user.role,
    },
  });
};

// ---------------------------------------
// LOGOUT USER
// ---------------------------------------
exports.logout = (req, res) => {
  /**
   * This removes JWT from browser
   * No DB operation
   * No user deletion
   * 100% safe
   */

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,      // true for production (https)
    sameSite: "none",  // required for cross-site cookies
    path: "/",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};
