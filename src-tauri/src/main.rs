#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
use std::fs;
#[tauri::command]

fn save_files(path: String, data: u8)  {
    let data = "Some data!";
    fs::write("./tmp/foo", data).expect("Unable to write file");
}