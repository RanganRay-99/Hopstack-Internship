const { getShipmentRates } = require('../../../src')

const testFunction = async () => {
  const params = {
    carrierCode: 'fedex',
    serviceCode:null,
    packageCode:null,
    fromPostalCode: '78703',
    toState: 'DC',
    toCountry:'US',
    toPostalCode: '20500',
    toCity: 'Washington',
    weightValue: 3,
    weightUnits: 'ounces',
    dimensionsUnits: 'inches',
    dimensionsLength: 7,
    dimensionsWidth: 5,
    dimensionsHeight: 6,
    confirmation: 'delivery',
    residential: false
  }
  const data = await getShipmentRates(params)
  console.log(data)
}

testFunction()

// data: {
//   Message: 'An error has occurred.',
//   ExceptionMessage: 'No applicable services were available for the configured shipment',
//   ExceptionType: 'System.Exception',
//   StackTrace: '   at SS.Core.Utilities.Rates.RateUtility.GetRates(Nullable`1 carrierId, Nullable`1 providerId, Nullable`1 warehouseId, String fromZip, String country, String postalCode, String city, Nullable`1 weight, UnitOfMeasureWeight weightUnitOfMeasure, Nullable`1 package, Nullable`1 l, Nullable`1 w, Nullable`1 h, UnitOfMeasureDimension dimensionUnitOfMeasure, Confirmation confirmation, Int32 insuranceProvider, Nullable`1 insuredValue, Boolean allowSelection, Boolean residential, Nullable`1 nonMachinable, OrderPackage[] packages, CustomsItem[] customsItems, Nullable`1 billDutiesToSender, Nullable`1 saturdayDelivery, Nullable`1 alcohol, String shipState, OrderSetting[] settings, Order order, Warehouse warehouse, Boolean primaryProvidersOnly, Address destinationAddress, HashSet`1 shippingServiceIds, String fromCity, String fromState) in D:\\buildAgentFull\\work\\8e15a453e647e65a\\SS.Core\\Utilities\\Rates\\RateUtility.cs:line 0\r\n' +
//     '   at SS.OpenApi.Controllers.ShipmentsController.GetRates(RateRequest request) in D:\\buildAgentFull\\work\\8e15a453e647e65a\\SS.OpenApi\\Controllers\\ShipmentsController.cs:line 499\r\n' +   
//     '   at lambda_method(Closure , Object , Object[] )\r\n' +
//     '   at System.Web.Http.Controllers.ReflectedHttpActionDescriptor.ActionExecutor.<>c__DisplayClass10.<GetExecutor>b__9(Object instance, Object[] methodParameters)\r\n' +
//     '   at System.Web.Http.Controllers.ReflectedHttpActionDescriptor.ExecuteAsync(HttpControllerContext controllerContext, IDictionary`2 arguments, CancellationToken cancellationToken)\r\n' +      
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Web.Http.Controllers.ApiControllerActionInvoker.<InvokeActionAsyncCore>d__0.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter`1.GetResult()\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<CallOnActionExecutedAsync>d__5.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<CallOnActionExecutedAsync>d__5.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<ExecuteActionFilterAsyncCore>d__0.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter`1.GetResult()\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<CallOnActionExecutedAsync>d__5.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<CallOnActionExecutedAsync>d__5.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Web.Http.Filters.ActionFilterAttribute.<ExecuteActionFilterAsyncCore>d__0.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.ValidateEnd(Task task)\r\n' +
//     '   at System.Web.Http.Controllers.ActionFilterResult.<ExecuteAsync>d__2.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Web.Http.Filters.AuthorizationFilterAttribute.<ExecuteAuthorizationFilterAsyncCore>d__2.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter`1.GetResult()\r\n' +
//     '   at System.Web.Http.Controllers.ExceptionFilterResult.<ExecuteAsync>d__0.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Web.Http.Controllers.ExceptionFilterResult.<ExecuteAsync>d__0.MoveNext()\r\n' +
//     '--- End of stack trace from previous location where exception was thrown ---\r\n' +
//     '   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n' +
//     '   at System.Runtime.CompilerServices.TaskAwaiter`1.GetResult()\r\n' +
//     '   at System.Web.Http.Dispatcher.HttpControllerDispatcher.<SendAsync>d__1.MoveNext()'
// }