//userが見つからない場合
export class UserNotFoundException extends Error { }
//usernameはすでに存在しています。
export class UserNameAlreadyExist extends Error { }
//ユーザーの登録ができなかった場合
export class CanNotRegisterUserException extends Error { }
