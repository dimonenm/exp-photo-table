const fSettings = {
  regexpCheckingComplianceInitialsSurname: (initialsAndSurname) => {
    // функция проверяет строку на соответствие инициалам и фамилии по шаблону и возвращает 0 или 1
    const regexp = /[А-Я]\.[А-Я]\.\s[А-Яа-я]+$/g;
    return [...initialsAndSurname.matchAll(regexp)].length;
  },
}

export default fSettings;