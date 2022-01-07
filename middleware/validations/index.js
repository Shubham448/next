import withJoi from "next-joi";
import { code, makeResponse } from "../../utils/common/response";

export default withJoi({
  onValidationError: (req, res, error) => {
    console.log(error)
    return makeResponse(res, code.BAD_REQUEST, false, error?.details[0]?.message || 'Bad request');
  },
});
