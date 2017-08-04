export const toWeekday = (wd) => {
  switch (wd) {
    case '0':
    return 'Maanantaisin'
    case '1':
    return 'Tiistaisin'
    case '2':
    return 'Keskiviikkoisin'
    case '3':
    return 'Torstaisin'
    case '4':
    return 'Perjantaisin'
    case '5':
    return 'Lauantaisin'
    default:
    return 'Sunnuntaisin'      
  }
}
