// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            init_app_settings,
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

use std::fs::{self};
use std::io;
use std::path::{Path, PathBuf};
use serde::Serialize;

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

#[tauri::command]
fn init_app_settings() -> Result<String, String> {
    ensure_app_folder_and_settings().map_err(|e| e.to_string())?;
    Ok("Settings initialized successfully".to_string())
}

fn ensure_app_folder_and_settings() -> io::Result<()> {
    // 1. Получаем путь к Roaming
    let roaming_path = get_roaming_dir()?;
    
    // 2. Путь к папке приложения
    let app_folder = roaming_path.join("exp-photo-table");
    
    // Проверяем, существует ли папка exp-photo-table
    if !app_folder.exists() {
        fs::create_dir_all(&app_folder)?;
    }
    
    // 3. Путь к файлу settings.json
    let settings_path = app_folder.join("settings.json");
    
    // Проверяем, существует ли файл settings.json
    if !settings_path.exists() {
        // Создаём настройки по умолчанию
        let default_settings = Settings {
            address: "Адрес не указан".to_string(),
            executors: [].to_vec(),
            note: "Примечание: не указано".to_string(),
            official_status: "специалист".to_string(),
            tel: "Телефон не указан".to_string(),
            unit: "Подразделение не указано".to_string(),
            zip_code: "Почтовый индекс не указан".to_string(),
        };
        
        // Сериализуем и сохраняем
        let json_content = serde_json::to_string_pretty(&default_settings)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
        
        fs::write(&settings_path, json_content)?;
    }
    
    Ok(())
}

fn get_roaming_dir() -> io::Result<PathBuf> {
    // Для Windows: используем переменную APPDATA
    // Для macOS/Linux: используем crate dirs
    #[cfg(target_os = "windows")]
    {
        std::env::var("APPDATA")
            .map(PathBuf::from)
            .map_err(|_| io::Error::new(io::ErrorKind::NotFound, "APPDATA not found"))
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        dirs::data_dir()
            .ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "Data directory not found"))
    }
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
