import type ListItem from '../../types/ListItem'

import './OutputList.css'

interface OutputListProps {
  list: ListItem[]
}

function OutputList ({ list }: OutputListProps) {
  return (
        <div
            className="outputList"
        >
            <table>
                <tbody>
                    {
                        list.map((i, n) => (
                          i.type !== 'SPC' || list.length !== n + 1
                            ? (
                                    <tr
                                        className={i.value >= 0 ? 'blue' : 'red'}
                                        key={i.key}
                                    >
                                        <td>
                                            {
                                                i.type !== 'SPC'
                                                  ? i.type !== 'NUM'
                                                    ? i.value.toFixed(2)
                                                    : `${i.value} ${Array(32 - i.value.toString().length).join('-')}`
                                                  : ''
                                            }
                                        </td>
                                        <td>
                                            {
                                                (() => {
                                                  switch (i.type) {
                                                    case 'ADD':
                                                      return '+'
                                                    case 'SUB':
                                                      return '-'
                                                    case 'TOT':
                                                      return 'G+'
                                                    case 'CLR':
                                                      return 'C'
                                                    case 'NUM':
                                                      return '#'
                                                  }
                                                })()
                                            }
                                        </td>
                                    </tr>
                              )
                            : null
                        ))
                    }
                </tbody>
            </table>
        </div>
  )
}

export default OutputList
