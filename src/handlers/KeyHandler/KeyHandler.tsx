import { useEffect, useState } from 'react'

import type ListItem from '../../types/ListItem'

interface KeyHandlerProps {
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>
  list: ListItem[]
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
}

function KeyHandler ({ setList, list, setValue, value }: KeyHandlerProps) {
  const [isResult, setIsResult] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const keyDownHandler = (event: KeyboardEvent) => {
    // DIGITS
    if (
      event.key === '1' ||
            event.key === '2' ||
            event.key === '3' ||
            event.key === '4' ||
            event.key === '5' ||
            event.key === '6' ||
            event.key === '7' ||
            event.key === '8' ||
            event.key === '9' ||
            event.key === '0'
    ) {
      if (total.toFixed(2) === value || isResult) {
        setValue(event.key)
        setIsResult(false)
      } else {
        setValue((currentValue) => {
          if (currentValue.slice(-3, -2) === '.') {
            return currentValue
          }
          return currentValue + event.key
        })
      }
    } else if (event.key === '.') {
      if (total.toFixed(2) === value || isResult) {
        setValue(event.key)
        setIsResult(false)
      } else {
        setValue((currentValue) => {
          if (currentValue.includes('.')) {
            return currentValue
          }
          return currentValue + '.'
        })
      }
    }

    // OPERATORS
    if (event.key === '+') {
      const parsedValue = value.includes('.') ? Number(value) : Number(value) / 100
      setList((currentList) => [
        ...currentList,
        {
          key: Date.now().toString(),
          type: 'ADD',
          value: parsedValue
        }
      ])
      setValue((total + parsedValue).toFixed(2))
      setTotal((currentTotal) => currentTotal + parsedValue)
    } else if (event.key === '-') {
      const parsedValue = value.includes('.') ? Number(value) : Number(value) / 100
      setList((currentList) => [
        ...currentList,
        {
          key: Date.now().toString(),
          type: 'SUB',
          value: 0 - parsedValue
        }
      ])
      setValue((total - parsedValue).toFixed(2))
      setTotal((currentTotal) => currentTotal - parsedValue)
    } else if (event.key === 'Enter') {
      setList((currentList) => [
        ...currentList,
        {
          key: Date.now().toString(),
          type: 'TOT',
          value: total
        },
        {
          key: (Date.now() + 1).toString(),
          type: 'SPC',
          value: 0
        }
      ])
      setTotal(0)
      setValue(total.toFixed(2))
      setIsResult(true)
    }

    // FORMATING
    if (event.key === 'c') {
      if (value === '0') {
        setTotal(0)
        setList((currentList) => [
          ...currentList,
          {
            key: Date.now().toString(),
            type: 'CLR',
            value: 0
          },
          {
            key: (Date.now() + 1).toString(),
            type: 'SPC',
            value: 0
          }
        ])
      } else {
        setValue('0')
      }
    } else if (event.key === 'f') {
      setList((currentList) => [
        ...currentList,
        {
          key: (Date.now() + 1).toString(),
          type: 'SPC',
          value: 0
        }
      ])
    } else if (event.key === 't') {
      setList([])
    } else if (event.key === '#') {
      const parsedValue = Number(value)
      setList((currentList) => [
        ...currentList,
        {
          key: (Date.now() + 1).toString(),
          type: 'NUM',
          value: !isNaN(parsedValue) ? parsedValue : 0
        }
      ])
      setValue('0')
    }

    // PRINTING
    if (event.key === 'p') {
      window.print()
    }

    setValue((currentValue) => {
      if (currentValue !== '0' && currentValue[0] === '0' && currentValue[1] !== '.') {
        return currentValue.slice(1)
      }
      return currentValue
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false)

    return () => {
      document.removeEventListener('keydown', keyDownHandler, false)
    }
  }, [isResult, list, total, value])

  return null
}

export default KeyHandler
