
## 概要

サンプルデータ
```
{
    "id": "b85b1395-9e0e-4d8d-affb-bce0983396b3",
    "name": "test",
    "mailAddress": "test1@test1.test"
}
```

apiの概要
```
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
```


## setup

```bash
git clone ~~
cd 2021-...
docker-compose up -d

#テーブルの作成
aws dynamodb create-table --cli-input-json file://user-table.json --endpoint-url http://localhost:8000 --billing-mode PAY_PER_REQUEST
#リポジトリのエンドポイントの修正(docker network inspect sam-cliなどで)

cd backend
npx cdk synth --no-staging >template.yaml && sam local start-api -t template.yaml --docker-network sam-cli
```

## 実装上の留意点

- エンティティ（user）にgetterとセッターを定義しちゃう。。。
->通知オブジェクトを作ってid以外はprivateメソッドに変更
- commandオブジェクトを利用してapplication serviceをシンプルに

## ハマり・ミスポイント

- ソートキーで検索したときは、グローバルインデックスに設定する。
- ドメインオブジェクトでsdkのattributeの値として渡してしまって、`Invalid attribute value type`になる。.valueをつけようね