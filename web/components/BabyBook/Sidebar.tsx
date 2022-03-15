import { useRouter } from "next/router"
import { BabyBook, BabyBookMonths } from "pages/book/[babyId]"
import { useEffect, useState } from "react"

const SideBar = ({ babyBook } : Props) => {
  const router = useRouter()
  const years = Object.keys(babyBook)

  const [currentYear, setCurrentYear] = useState(years[0])
  const [currentMonth, setCurrentMonth] = useState(babyBook[years[0]] ? Object.keys(babyBook[years[0]])[0] : '')
  useEffect(() => {
    const onHashChange = (url = window.location.pathname + window.location.hash) => {
      const hash = url.substring(url.indexOf('#') + 1)
      const [year, month] = hash.split('.')
      if (month === undefined) return
      setCurrentMonth(month)
      setCurrentYear(year)
    }
    if (window.location.hash) onHashChange()
    router.events.on('hashChangeStart', onHashChange)
    return () => {
      router.events.off('hashChangeStart', onHashChange)
    }
  }, [router.events])
  const [selected, setSelected] = useState({})
  return (
    <div className="overflow-auto">
      <div className="w-[164px] flex flex-col items-end pt-8 text-dark-400 overflow-hidden">
        {years.map(year => <YearSection key={year} year={year} months={babyBook[year]} currentYear={currentYear} currentMonth={currentMonth}/>)}
      </div>
    </div>
  )
}

interface Props {
  babyBook: BabyBook
}

const YearSection = ({ year, months, currentYear, currentMonth } : { year: string, months: BabyBookMonths, currentYear: string, currentMonth: string}) => {
  const router = useRouter()
  const pushHash = (hash: string) => {
    router.push(`#${hash}`, undefined, { scroll: false })
  }
  const INDEX_TO_MONTH : { [key: string] : string } = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  }
  return (
    <div className="w-full flex flex-col items-end">
      <p className={`font-semibold text-lg border-r px-4 ${year === currentYear ? 'text-black' : ''}`}>{year}</p>
      <div className={`flex flex-col text-right w-full ${year === currentYear ? '' : 'hidden'}`}>
        {Object.keys(months).map((month) => <p key={month} onClick={() => pushHash(`${year}.${month}`)} className={`p-1 px-8 w-full border-r ${month===currentMonth ? 'bg-alt border-r-[3px] border-highlight text-black' : ''}`}>{INDEX_TO_MONTH[month]}</p>)}
      </div>
    </div>
  )
}

export default SideBar
