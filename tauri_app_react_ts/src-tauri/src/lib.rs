// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            create_exp_photo_table_dir_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn create_exp_photo_table_dir_command(url: &str) -> Result<String, String> {
    create_exp_photo_table_dir(&url).map_err(|e| e.to_string())?;

    Ok("Folder has been created".to_string())
}

use std::fs::{self, File};
use std::io;
use std::path::Path;
use serde::Serialize;

fn create_exp_photo_table_dir(url: &str) -> io::Result<()> {
    if dir_exists(url)? {
        return Ok(());
    }

    fs::create_dir_all(url)?;
    Ok(())
}

fn dir_exists(path: &str) -> io::Result<bool> {
    match fs::metadata(path) {
        Ok(meta) => Ok(meta.is_dir()),
        Err(e) if e.kind() == io::ErrorKind::NotFound => Ok(false),
        Err(e) => Err(e),
    }
}

fn save_settings_to_file<T, P>(path: P, data: &T) -> io::Result<()>
where
    T: Serialize,
    P: AsRef<Path>,
{
    let path = path.as_ref();

    // 1️⃣ Создаём директорию, если её нет
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }

    // 2️⃣ Создаём файл
    let file = File::create(path)?;

    // 3️⃣ Сериализуем в JSON
    serde_json::to_writer_pretty(file, data)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;

    Ok(())
}