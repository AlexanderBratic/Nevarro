# Getting Started
### Setting up Gradle
For windows command line in API directory:
``` bash
gradlew.bat
```
For linux command line in API directory:
``` bash
./gradlew
```

#### Installing dependencies
Needs to be done at least once to be able to un the API.
``` bash
gradlew.bat dependencies
```

#### Running the api in dev mode
Running this will start an devolpment server at http://localhost:8080. A program like [postman](https://www.postman.com/) or [insomnia](https://insomnia.rest/download) can be used to test the API.
``` bash
gradlew.bat bootRun
```

#### Building a jar
``` bash
gradlew.bat build
```

#### Running tests
``` bash
gradlew.bat test
```

### Reference Documentation
For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.7.3/gradle-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.7.3/gradle-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.7.3/reference/htmlsingle/#web)
* [Spring REST Docs](https://docs.spring.io/spring-restdocs/docs/current/reference/html5/)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Additional Links
These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)

