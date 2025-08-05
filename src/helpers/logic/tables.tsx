import { ProjectStatusEnums } from '../enums/tables'

const colorsStatus = (status: ProjectStatusEnums) => {
  switch (status) {
    case ProjectStatusEnums?.WORKING:
      return {
        border: '#a9ebdc',
        background: '#d0faf0',
        text: '#237f74',
      }
    case ProjectStatusEnums?.CANCELED:
      return {
        border: '#fbdbe4',
        background: '#ffe7ed',
        text: '#b03962',
      }
    case ProjectStatusEnums?.DONE:
      return {
        border: '#e9e9a9',
        background: '#fdf8c1',
        text: '#9d6c12',
      }
    default:
      break
  }
}

const colorsProgress = (value: number) => {
  if (30 <= value && value < 80) {
    return 'bg-[#21d4fd]'
  } else if (value >= 80) {
    return 'bg-[#98ec2d]'
  } else {
    return 'bg-[#ea0606]'
  }
}

export { colorsStatus, colorsProgress }
