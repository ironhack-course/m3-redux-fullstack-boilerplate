export enum ActionType {
    INIT = "@@INIT",
    update_user = "update_user",
    user_created = "user_created",
    user_exists = "user_exists",
    create_asset = "create_asset",
    update_asset = "update_asset",
    delete_asset = "delete_asset",
    render_test = "render_test",
    server_called = "server_called",
    asset_updated = "asset_updated",
    add_assets_from_server = "add_assets_from_server",
    login = "login",
    signup = 'signup',
    logout = "logout"
}
export interface IAction {
    type: ActionType;
}
