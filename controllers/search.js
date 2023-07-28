import { PasswordManger } from "../Helpers/database.js";

export const search = async (req, res) => {
   console.log(req.params.search);
   console.log(req.params.userId);
   const result = await PasswordManger.find({ id: req.params.userId });
   let foundSearch = result.filter((data) => {
      if (data.title.includes(req.params.search)) {
         return data;
      } else if (data.email.includes(req.params.search)) {
         return data;
      }
   });
   console.log(foundSearch);
   res.send("/home");
};
