# Docker 

Контейнер располагается в Dockerhub skayloo/task1:v1.0.1

# Kubernetes

app-deployment основное приложение

остальное - метрики и балансировщики

# Alerting
Чтобы вызвать alert выполните команды
```sudo apt install hey```
```hey -z 1m -c 10 http://51.250.40.137:80/error```
Эта команда создаст нагрузку на приложение в течение 1 минуты с 10 одновременными соединениями.

# App
Приложение доступно по адресу 51.250.40.137

# Prometheus
Можно потыкать по адресу [84.201.151.251](http://84.201.151.251/targets?search=)

# Grafana
Можно глянуть по адресу 84.201.144.148

# Личная просьба
Искренне прошу не затягивать с проверкой задания, т.к яндекс облако ну уж очень много денег ест
