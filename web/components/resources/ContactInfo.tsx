export default function ContactInfo() {
  return (
    <div className="w-[20.438rem] h-[23.25rem] px-6 py-6 mt-3 bg-white rounded shadow flex-col justify-start items-start inline-flex sm:w-full sm:h-full sm:overflow-auto">
      <img src="/MessageTextIcon.svg"></img>
      <div className="w-full text-lg font-bold py-2">Reach out to us!</div>
      <div className="w-full text-dark-gray">
        We know childcare isn’t the easiest, but we’re here to help. Let us know
        if you have any questions, concerns, feedback, or just want to chat.
      </div>
      <div className="flex flex-row pt-3 sm:pt-5">
        <img src="/CellphoneIcon.svg" className="w-10 h-10"></img>
        <div className="flex flex-col justify-center items-start pl-6 w-full min-w-0">
          <div className="text-dark-gray text-sm font-semibold">Text</div>
          <div className="break-words w-full">(678) 404-1397</div>
        </div>
      </div>
      <div className="flex flex-row pt-3 sm:pt-5 w-full">
        <img src="/MailIcon.svg" className="w-10 h-10"></img>
        <div className="flex flex-col justify-center items-start pl-6 w-full min-w-0">
          <div className="text-dark-gray text-sm font-semibold">Email</div>
          <div className="break-words w-full">info@motherhoodbeyond.org</div>
        </div>
      </div>
      <div className="flex flex-row pt-3 sm:pt-5">
        <img src="/PhoneIcon.svg" className="w-10 h-10"></img>
        <div className="flex flex-col justify-center items-start pl-6 w-full min-w-0">
          <button className="h-full px-4 rounded border border-mbb-pink justify-center items-center">
            <div className="text-mbb-pink font-semibold">
              <div className="break-words w-full">Call on Google Voice</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
