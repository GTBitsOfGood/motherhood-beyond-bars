import { monthIndexToString } from "@lib/date"
import { useRouter } from "next/router"
import { BabyBookYear, BabyBookMonth } from "pages/book/[babyId]"
import { useEffect, useState } from "react"

const SideBar = ({ babyBook } : Props) => {
  const router = useRouter()

  const [currentYear, setCurrentYear] = useState(babyBook[0].year)
  const [currentMonth, setCurrentMonth] = useState(babyBook[0].months[0].month)
  useEffect(() => {
    const onHashChange = (url = window.location.pathname + window.location.hash) => {
      const hash = url.substring(url.indexOf('#') + 1)
      const [year, month] = hash.split('.')
      if (month === undefined) return
      const yearNumber = parseInt(year)
      const monthNumber = parseInt(month)
      if (isNaN(yearNumber) || isNaN(monthNumber) || monthNumber < 0 || monthNumber > 11 ) return
      setCurrentMonth(monthNumber)
      setCurrentYear(yearNumber)
    }
    if (window.location.hash) onHashChange()
    router.events.on('hashChangeStart', onHashChange)
    return () => {
      router.events.off('hashChangeStart', onHashChange)
    }
  }, [router.events])
  return (
    <div className="overflow-auto shrink-0">
      <div className="w-[164px] flex flex-col items-end pt-8 text-dark-400 overflow-hidden">
        {babyBook.map(year => <YearSection key={year.year} year={year.year} months={year.months} currentYear={currentYear} currentMonth={currentMonth}/>)}
      </div>
    </div>
  )
}

interface Props {
  babyBook: BabyBookYear[]
}

const YearSection = ({ year, months, currentYear, currentMonth } : { year: number, months: BabyBookMonth[], currentYear: number, currentMonth: number}) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(year === currentYear)
  const pushHash = (hash: string) => {
    router.push(`#${hash}`, undefined, { scroll: false })
  }
  
  return (
    <div className="w-full flex flex-col items-end">
      <p onClick={() => setIsExpanded(!isExpanded)} className={`font-semibold text-lg border-r px-4 cursor-pointer ${year === currentYear ? 'text-black' : ''}`}>{year}</p>
      <div className={`flex flex-col text-right w-full ${isExpanded ? '' : 'hidden'}`}>
        {months.map((month) => <p key={month.month} onClick={() => pushHash(`${year}.${month.month}`)} className={`p-1 px-8 w-full border-r cursor-pointer ${month.month===currentMonth ? 'bg-alt border-r-[3px] border-highlight text-black' : ''}`}>{monthIndexToString(month.month)}</p>)}
      </div>
    </div>
  )
}

export default SideBar
