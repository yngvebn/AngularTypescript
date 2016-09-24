@Component(Demo.module, {
    templateUrl: "/app/Home/Home.tpl.html"
})
class HomeComponent{
    public greeting: string;

    constructor(){
        this.greeting = "Hello Demo!";
    }
}