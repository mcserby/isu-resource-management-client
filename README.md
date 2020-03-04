# isu-resource-management-client
vue.js web client application for ISU resource management

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Maven Setup

In order to avoid using installed maven version on the machine(and existing maven configuration), or to avoid installing it:

# setup maven wrapper for the current project
mvn -N io.takari:maven:wrapper

# run maven wrapper instead of installed maven
./mvnw clean install
mvnw.cmd clean install

For more details refer to the project [page](https://github.com/takari/maven-wrapper).
