import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    //TODO - Create GetAll function
    //const data = await api.GetAll();
    //res.json(data);
  } catch (error) {
    // const mappedError = mapErrors(error);
    // res.status(500).json({error: mappedError});
  }
});
