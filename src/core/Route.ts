/**
  * Registers a route for a component.
  * Properties in component bindings can be registered as resolves. The template will not be loaded until all promises in the resolves are completed.
  * @param {angular.IModule} module The module to register routes for
 * @param {angular.ui.IState} stateConfiguration Configuration-properties for the state. Normally only the url is necessary, as well as resolves
 * 
*/
function Route(module: angular.IModule, stateConfiguration: angular.ui.IState) {
    return (component: any) => {
        if (!component.name) {
            component.name = component.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        
        var selector = camelize(component.name.replace('Component', ''));
        stateConfiguration.name = stateConfiguration.name || selector;
        stateConfiguration.component = stateConfiguration.component || selector;
        
        function camelize(str: string): string {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g,
                (letter: string, index: number) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase()))
                .replace(/\s+/g, '');
        }
        
        module.config([
            '$stateProvider', ($stateProvider) => {
                $stateProvider.state(stateConfiguration);
            }
        ]);
    }
}