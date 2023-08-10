const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1
const enum NotificationTitle {
    Order = 'order',
    UpdateOrder = 'Order Updated',
}
const enum NotificationMessage {
    NewOrder = 'A new order has been created',
    UpdateOrder = 'An order has been updated'
}
export {
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    NotificationTitle,
    NotificationMessage
}