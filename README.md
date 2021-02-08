
## 概要

/users/
    post(username,useradress)
    - ユーザを登録する
    return ok,ng

/users/{:userId}
    get
    - ユーザ情報を確認する
    return user,error(500)

    patch
    - ユーザ情報を更新する
    return ok, error(500)

    delete
    - 退会する
    return ok,error(500)すでにいない



## 実装上の注意

エンティティ（user）にgetterとセッターを定義しちゃう。。。
->通知オブジェクトを作ってid以外はprivateメソッドに変更

## ハマり・ミスポイント

- ソートキーで検索したときは、グローバルインデックスに設定する。
- ドメインオブジェクトでsdkのattributeの値として渡してしまって、`Invalid attribute value type`になる。.valueをつけようね

## setup

```
git clone ~~
cd 2021-...
docker-compose up -d
aws dynamodb create-table --cli-input-json file://user-table.json  --endpoint-url http://localhost:8000 --billing-mode PAY_PER_REQUEST
cd backend
npx cdk synth --no-staging >template.yaml && sam local start-api -t template.yaml --docker-network sam-cli
```