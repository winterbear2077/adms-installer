use std::vec;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod utils;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_interfaces() -> Vec<String> {
    vec!["eth0".to_string(), "wlan0".to_string(), "lo".to_string()]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_interfaces])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
