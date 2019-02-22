define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtoolbar',
        'ojs/ojbutton', 'ojs/ojnavigationlist', 'ojs/ojrouter'],
    function(oj, ko, $)
    {
        function rout()
        {
            // Change the router base URL value. This is needed when using the path URL
            // adapter because the default base URL value of '/' doesn't match this
            // application path. Use the value set on the <base> tag of this page.
            var self=this;
            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            // Retrieve the router static instance and configure the states

            var router = oj.Router.rootInstance;
            router.configure(
                {
                    'preface':  { label: 'Calltree',     value: 'calltree', isDefault: true },
                    'chapter2': { label: 'Snapshot', value: 'snapshot' }

                });
            var viewModel =
                {
                    router: router
                };

        }
        return rout;
    });
