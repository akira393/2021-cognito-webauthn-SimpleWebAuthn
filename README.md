

## local実行のsetup

```
docker network create sam-cli
npx cdk synth --no-staging >template.yaml
sam local start-api -t template.yaml --docker-network sam-cli
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


## todo

create以外のlambdaとリソースの定義をしちゃう
readmeの拡充
    setup（なんとなくやったところの調査もする。）
openapiの仕様を作成する


## 改善点

エンティティ（user）にgetterとセッターを定義しちゃう。。。


## ハマりポイント
ソートキーで検索したときは、グローバルインデックスに設定する。

## setup

```
git clone ~~
cd 2021-...
docker-compose up -d
aws dynamodb create-table --cli-input-json file://user-table.json  --endpoint-url http://localhost:8000 --billing-mode PAY_PER_REQUEST
cd backend
npx cdk synth --no-staging >template.yaml && sam local start-api -t template.yaml --docker-network sam-cli
```