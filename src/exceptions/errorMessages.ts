export enum HttpMessage {
  SUCCESS = "Success",
  CREATED = "Created",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "unAuthorized",
  INVALID_ID = "Invalid ID",
  ALREADY_DONE = "Already Done",
  ALREADY_USED = "Already Used",
  EXPIRED = "Expired",
  CONFLICT = "Already Exists",
  CANNAT_UPDATE = "Cannot Update Order Status",
  NOT_FOUND = "Not Found",
  FORBIDDEN = "Forbidden",
  QUANTITY_OUR_OF_STOCK = "Quantity out Stock",
  ACCESS_DENIED = "Access Denied",
  INVALID_PARENT_CATEGORY = "Invalid parent category",
  NO_CONTENT = "No Content",
  NO_FILE_CHOSEN = "No File Chosen",
  INTERNAL_SERVER_ERROR = "Something Went Wrong",
  EMAIL_SEND = "Email has been sent",
  EMAIL_SEND_ERROR = "Some Error Occured while sending email",
  RESET_PASSWORD_ERROR = "Your new password must be different from your previous password",
}