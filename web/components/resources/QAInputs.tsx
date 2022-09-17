import React, { useState, useEffect, Dispatch } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

type Props = { question: string; setQuestion: Dispatch<string>; setAnswer: Dispatch<string>; answer: string };
export default function QAInputs(props: Props) {
    <div>
        <br>
        </br>
        {/* Q, A, and icons */}
        <div>
            {/* Q and A */}
            <div>
                {/* Q and text area*/}
                <div>
                    <label htmlFor="question">Q</label>
                    <input className="font-opensans text-base w-80 bg-light-gray-300 border-1 border-light-gray-700 p-2"
                        type="textarea" id="question" name="question" value={props.question}
                        onChange={(e) => props.setQuestion(e.target.value)} required />
                    {/* (e) => setQuestion(e.target.value) */}
                </div>
                {/* A and text area */}
                <div>
                    <label htmlFor="answer">A</label>
                    <input className="font-opensans text-base w-80 bg-light-gray-100 border-1 border-light-gray-700 p-2"
                        type="textarea" id="answer" name="answer" value={props.answer}
                        onChange={(e) => props.setAnswer(e.target.value)} required />
                </div>
            </div>
            <ol className="arrows">
                <li>
                    <button type="button">
                        <RiArrowUpSLine />
                    </button>
                </li>
                <li>
                    <button type="button">
                        <RiArrowDownSLine />
                    </button>
                </li>
                <li>
                    <button type="button">
                        <BiTrashAlt />
                    </button>
                </li>
            </ol>
        </div>
    </div >
}