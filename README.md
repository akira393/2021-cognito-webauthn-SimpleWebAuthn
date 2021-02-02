

## local実行のsetup

```
docker network create sam-cli
npx cdk synth --no-staging >template.yaml
sam local start-api -t template.yaml --docker-network sam-cli
```

