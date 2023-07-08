import React from 'react'
import { useState } from 'react';

function CardYear() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [errorDay, setErrorDay] = useState('');
    const [errorMonth, setErrorMonth] = useState('');
    const [errorYear, setErrorYear] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [ageYears, setAgeYears] = useState('');
    const [ageMonths, setAgeMonths] = useState('');
    const [ageDays, setAgeDays] = useState('');


    const validateInputs = () => {
        setErrorDay('');
        setErrorMonth('');
        setErrorYear('');
        setErrorDate('');
        setAgeYears('');
        setAgeMonths('');
        setAgeDays('');

        let hasError = false;

        const isDateValid = (day, month, year) => {
            const date = new Date(year, month - 1, day);

            if (
                date.getDate() !== parseInt(day) ||
                date.getMonth() + 1 !== parseInt(month) ||
                date.getFullYear() !== parseInt(year)
            ) {
                return false;
            }

            return true;
        };

        if (!day) {
            setErrorDay('This field is required.');
            hasError = true;
        } else if (day < 1 || day > 31) {
            setErrorDay('Must be a valid day.')
            hasError = true;
        }

        if (!month) {
            setErrorMonth('This field is required.');
            hasError = true;
        } else if (month < 1 || month > 12) {
            setErrorMonth('Must be a valid month.');
            hasError = true;
        }

        if (!year) {
            setErrorYear('This field is required.');
            hasError = true;
        } else if (year > new Date().getFullYear()) {
            setErrorYear('Must be in the past.');
            hasError = true;
        }

        if (!hasError && day && month && year) {
            if (!isDateValid(day, month, year)) {
              setErrorDate('Must be a valid date.');
            } else {
              const currentDate = new Date();
              const inputDate = new Date(year, month - 1, day);
              const ageInMilliseconds = currentDate - inputDate;
              const ageDate = new Date(ageInMilliseconds);
              const years = Math.abs(ageDate.getUTCFullYear() - 1970);
              const months = Math.abs(ageDate.getUTCMonth());
              const days = Math.abs(ageDate.getUTCDate() - 1);
      
              setAgeYears(years);
              setAgeMonths(months);
              setAgeDays(days);
            }
          }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateInputs();
    };

    return (
        <>
            <div className='flex items-center justify-center h-[100vh]'>
                <div className='font-pops bg-white w-[92%] sm:w-[840px]  sm:h-[640px] m-auto rounded-3xl rounded-br-[30%] px-4 py-10 md:p-16'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex'>
                            <label className={`flex font-bold flex-col ${errorDay || errorDate ? 'text-red-400' : ''}`}>
                                DAY
                                <input
                                    type="text"
                                    value={day}
                                    maxLength={2}
                                    placeholder='DD'
                                    onChange={(e) => setDay(e.target.value)}
                                    className={`font-bold text-xl text-black border border-gray-200 rounded-lg p-4 w-[90%] md:w-40 justify-between md:mr-8 focus:outline-none cursor-pointer focus:border-violet-500 ${errorDay || errorDate ? 'border-red-500' : ''}`}
                                />
                                {errorDay && <p className="text-red-500 font-light text-xs">{errorDay}</p>}
                                {errorDate && <p className="text-red-500 font-light text-xs">{errorDate}</p>}
                            </label>
                            <label className={`flex font-bold flex-col ${errorMonth || errorDate ? 'text-red-400' : ''}`}>
                                MONTH
                                <input
                                    type="text"
                                    value={month}
                                    maxLength={2}
                                    placeholder='MM'
                                    onChange={(e) => setMonth(e.target.value)}
                                    className={`font-bold text-xl text-black border border-gray-200 rounded-lg p-4 w-[90%] md:w-40 justify-between md:mr-8 focus:outline-none cursor-pointer focus:border-violet-500 ${errorMonth || errorDate ? 'border-red-500' : ''}`}
                                />
                                {errorMonth && <p className="text-red-500 font-light text-xs">{errorMonth}</p>}
                            </label>
                            <label className={`flex font-bold flex-col ${errorYear || errorDate ? 'text-red-400' : ''}`}>
                                YEAR
                                <input
                                    type="text"
                                    value={year}
                                    maxLength={4}
                                    placeholder='YYYY'
                                    onChange={(e) => setYear(e.target.value)}
                                    className={`font-bold text-xl text-black border border-gray-200 rounded-lg p-4 w-[90%] md:w-40 justify-between md:mr-8 focus:outline-none cursor-pointer focus:border-violet-500 ${errorYear || errorDate ? 'border-red-500' : ''}`}
                                />
                                {errorYear && <p className="text-red-500 font-light text-xs">{errorYear}</p>}
                            </label>
                        </div>
                        <div className='w-full flex items-center relative md:static my-16 md:m-0'>
                            <div className='w-full h-[2px] bg-gray-200'></div>
                            <button type='submit' className='absolute md:static left-[50%] translate-x-[-50%] md:translate-x-0 md:left-0 rounded-full bg-violet-600 p-6 hover:bg-black duration-300'><img src="/images/icon-arrow.svg" alt="" className='w-8' /></button>

                        </div>
                    </form>
                    <div>
                        <div className='flex text-6xl md:text-8xl font-extrabold'>
                            {ageYears !== '' ? (
                                <h1 className='text-violet-600'>{ageYears}</h1>
                            ) : (
                                <h1 className='text-violet-600'>--</h1>

                            )}
                            <h1 className='ml-4'>years</h1>
                        </div>
                        <div className='flex text-6xl md:text-8xl font-extrabold'>
                            {ageMonths !== '' ? (
                                <h1 className='text-violet-600'>{ageMonths}</h1>
                            ) : (
                                <h1 className='text-violet-600'>--</h1>
                            )}
                            <h1 className='ml-4'>months</h1>
                        </div>
                        <div className='flex text-6xl md:text-8xl font-extrabold'>
                            {ageDays !== '' ? (
                                <h1 className='text-violet-600'>{ageDays}</h1>
                            ) : (
                                <h1 className='text-violet-600'>--</h1>
                            )}
                            <h1 className='ml-4'>days</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardYear