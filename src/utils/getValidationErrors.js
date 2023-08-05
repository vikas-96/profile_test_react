import _ from "lodash";

export default function (error) {
  let errorData = {};
  if (error && error.response && error.response.status === 422) {
    let fields = _.values(error.response.data);
    fields.forEach(function (key, index) {
      errorData[index] = key.message;
    });
    if(!_.isEmpty(errorData)){
      return Object.values(errorData).join(", ");
    }
    return errorData;
  }
  return error.response.data.message;
}
