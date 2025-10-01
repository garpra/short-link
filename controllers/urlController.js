const urlService = require("../services/urlService");
const { randomText } = require("../utils/utils");

function getUserUrls(req, res) {
  if (!req.session.user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { id } = req.session.user;
  if (id) {
    const userUrls = urlService.getUrlsByUserId(id);
    res.json(userUrls);
  }
}

function addUrl(req, res) {
  const { url } = req.body;

  if (!req.session.user) {
    res.redirect("/login");
  }

  const userId = req.session.user.id;
  const shortCode = randomText();
  urlService.createUrl(userId, shortCode, url);

  res.redirect("/");
}

function getUrl(req, res) {
  const { shortCode } = req.params;
  const url = urlService.getUrlByShortCode(shortCode);

  if (url) {
    urlService.incrementClickCount(shortCode);
    res.redirect(url.original_url);
  } else {
    res.status(404).send("Not found");
  }
}

function deleteUrl(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "Id not found",
    });
  }

  urlService.deleteUrl(id);
  res.json({ success: true });
}

module.exports = {
  getUserUrls,
  addUrl,
  getUrl,
  deleteUrl,
};
