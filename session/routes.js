function SessionController(app) {
  const setSession = (req, res) => {
    const { property, value } = req.params;
    req.session[property] = value;
    console.log("setSession");
    console.log(req.session);
    res.json(req.session);
  };
  const getSession = (req, res) => {
    const { property } = req.params;
    const value = req.session[property];
    console.log("getSession");
    console.log(req.session);
    res.json({ ...req.session, property: value });
  };
  app.get("/api/session/set/:property/:value", setSession);
  app.get("/api/session/get/:property", getSession);
}

export default SessionController;