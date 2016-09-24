import * as ng from 'angular';

function Component(module: ng.IModule, options: {
    controllerAs?: string,
    template?: string,
    templates?: IResonsiveTemplates,
    templateUrl?: string,
    bindings?: any
}) {
    return (controller: any) => {
        if (!controller.name) {
            controller.name = controller.toString().match(/^function\s*([^\s(]+)/)[1];
        }
        var selector = camelize(controller.name.replace('Component', ''));

        function camelize(str: string): string {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter: string, index: number) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase())).replace(/\s+/g, '');
        }
        options.controllerAs = options.controllerAs || 'ctrl';
        controller.constructor.name = selector;

        if (options.templates) {
            module.directive(selector, GetDirectiveFactory(options.bindings, controller, options.controllerAs, options.templates));
        }
        else {
            module.component(selector, angular.extend(options, { controller: controller }));
        }
    };

    function GetDirectiveFactory(bindings, controller, controllerAs, templates: IResonsiveTemplates) {
        return ['$window', ($window) => ({
            scope: bindings,
            controller: controller,
            controllerAs: options.controllerAs,
            bindToController: true,
            template: "<ng-include src='templateUrl' />",
            link: (scope) => {
                
                var width = $window.innerWidth;
                setTemplate(width);

                angular.element($window).bind('resize', () => {
                    var width = $window.innerWidth;
                    setTemplate(width);
                    scope.$apply();
                });

                function setTemplate(width) {
                    var templateUrl;
                    if (width < BreakPoints.Small) {
                        templateUrl = templates.small;
                    } else if (width < BreakPoints.Medium) {
                        templateUrl = templates.medium;
                    } else if (width < BreakPoints.Large) {
                        templateUrl = templates.large;
                    } else {
                        templateUrl = templates.max;
                    }
                    if (scope.templateUrl !== templateUrl) {
                        scope.templateUrl = templateUrl;
                    }
                }

            }
        })];
    }
}

interface IResonsiveTemplates {
    small: string;
    medium: string;
    large: string;
    max: string;
}