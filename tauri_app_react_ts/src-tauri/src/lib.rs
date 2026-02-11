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
fn create_exp_photo_table_dir_command(url: &str, file_name: &str) -> Result<String, String> {
    create_exp_photo_table_dir(&url, &file_name).map_err(|e| e.to_string())?;

    Ok("Folder has been created".to_string())
}

use serde::Serialize;
use std::fs::{self, File};
use std::io;
use std::path::Path;

#[derive(Serialize)]
struct Settings {
    address: String,
    executors: Vec<String>,
    note: String,
    official_status: String,
    tel: String,
    unit: String,
    zip_code: String,
}

fn create_exp_photo_table_dir(url: &str, file_name: &str) -> io::Result<()> {
    if dir_exists(url)? {
        return Ok(());
    }

    fs::create_dir_all(url)?;

    let curent_setting = Settings {
        address: "Адрес не указан".to_string(),
        executors: [].to_vec(),
        note: "Примечание: не указано".to_string(),
        official_status: "специалист".to_string(),
        tel: "Телефон не указан".to_string(),
        unit: "Подразделение не указано".to_string(),
        zip_code: "Почтовый индекс не указан".to_string(),
    };

    let file_path = format!("{}/{}.json", url, file_name);

    let _ = save_settings_to_file(file_path, &curent_setting);

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

    // 1. Гарантируем существование директории
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }

    // 2. Сериализуем данные в красивую JSON-строку
    let json_content = serde_json::to_string_pretty(data)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;

    // 3. Записываем всё в файл за один раз (create + write + close)
    fs::write(path, json_content)?;

    Ok(())
}
