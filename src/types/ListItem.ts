export default interface ListItem {
  key: string
  type: 'ADD' | 'SUB' | 'TOT' | 'SPC' | 'CLR' | 'NUM'
  value: number
}
