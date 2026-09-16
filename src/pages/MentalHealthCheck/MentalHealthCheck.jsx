import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider.jsx";
import axios from "../../api/axios.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const QUESTIONS_URL = "/api/questions";

function MentalHealthCheck() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(QUESTIONS_URL, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
        setQuestions(response?.data?.data || []);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Server không phản hồi");
        } else {
          setErrMsg("Không thể tải câu hỏi đánh giá");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [auth]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const handleSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { content: answer.content, score: answer.score },
    }));
  };

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
  };


  const computeResult = () => {
    let earned = 0;
    let max = 0;

    questions.forEach((q) => {
      const chosen = answers[q._id];
      const questionMax = Math.max(0, ...q.answer.map((a) => a.score));
      max += questionMax;
      if (chosen) earned += chosen.score;
    });

    if (max === 0) return 0;
    return Math.round((earned / max) * 100);
  };

  const getResultCopy = (score) => {
    if (score >= 80) {
      return {
        label: "Ổn định",
        message:
          "Các câu trả lời của bạn cho thấy trạng thái tinh thần khá tích cực gần đây. Hãy tiếp tục duy trì những thói quen đang giúp ích cho bạn.",
      };
    }
    if (score >= 50) {
      return {
        label: "Cần quan tâm thêm",
        message:
          "Có vài dấu hiệu cho thấy bạn đang chịu một số áp lực. Dành thời gian nghỉ ngơi, chia sẻ với người thân hoặc bạn bè có thể giúp ích.",
      };
    }
    return {
      label: "Nên tìm thêm sự hỗ trợ",
      message:
        "Kết quả cho thấy bạn có thể đang trải qua giai đoạn khó khăn. Đây không phải là công cụ chẩn đoán y khoa — nếu cảm giác này kéo dài, hãy cân nhắc trò chuyện với chuyên gia tâm lý hoặc người bạn tin tưởng.",
    };
  };

  const allAnswered =
    currentQuestion && answers[currentQuestion._id] !== undefined;

  return (
    <>
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-600">
          Đang tải câu hỏi...
        </div>
      ) : errMsg ? (
        <div className="flex-1 flex items-center justify-center text-red-500 font-medium">
          {errMsg}
        </div>
      ) : totalQuestions === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-600">
          Hiện chưa có câu hỏi đánh giá nào.
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center px-6 py-10">
          <div className="w-full max-w-xl">
            {!finished ? (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>
                      Câu {currentIndex + 1} / {totalQuestions}
                    </span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E4E9E6]">
                    <div
                      className="h-2 rounded-full bg-[#3F6659] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white border border-[#E2E8E4] rounded-2xl p-8 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2F3E36] leading-snug mb-6">
                    {currentQuestion.content}
                  </h2>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.answer.map((ans, idx) => {
                      const isSelected =
                        answers[currentQuestion._id]?.content ===
                          ans.content &&
                        answers[currentQuestion._id]?.score === ans.score;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            handleSelect(currentQuestion._id, ans)
                          }
                          className={`text-left px-4 py-3 rounded-xl border transition ${
                            isSelected
                              ? "border-[#3F6659] bg-[#EEF3F0] text-[#2F3E36]"
                              : "border-[#E2E8E4] hover:bg-[#FAF9F6] text-gray-700"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex-shrink-0 w-4 h-4 rounded-full border ${
                                isSelected
                                  ? "border-[#3F6659] bg-[#3F6659]"
                                  : "border-gray-300"
                              }`}
                            />
                            {ans.content}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 disabled:opacity-30 hover:bg-black/5 transition"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Quay lại
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!allAnswered}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#3F6659] text-white disabled:opacity-40 hover:bg-[#345650] transition"
                  >
                    {currentIndex === totalQuestions - 1
                      ? "Xem kết quả"
                      : "Tiếp theo"}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </>
            ) : (
              <ResultView
                score={computeResult()}
                copy={getResultCopy(computeResult())}
                onRestart={handleRestart}
                onHome={() => navigate("/")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ResultView({ score, copy, onRestart, onHome }) {
  return (
    <div className="bg-white border border-[#E2E8E4] rounded-2xl p-10 shadow-sm text-center">
      <FontAwesomeIcon icon={faCircleCheck} className="text-[#3F6659] text-3xl mb-4" />

      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#E4E9E6"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#3F6659"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl text-[#2F3E36]">{score}</span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>

      <h2 className="font-serif text-xl text-[#2F3E36] mb-2">{copy.label}</h2>
      <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
        {copy.message}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="px-5 py-2 rounded-lg border border-[#E2E8E4] text-gray-600 hover:bg-[#FAF9F6] transition"
        >
          Làm lại
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#3F6659] text-white hover:bg-[#345650] transition"
        >
          <FontAwesomeIcon icon={faHeart} />
          Về trang chủ
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-8 max-w-md mx-auto">
        Đây là công cụ tự đánh giá tham khảo, không thay thế cho chẩn đoán hoặc
        tư vấn từ chuyên gia y tế.
      </p>
    </div>
  );
}

export default MentalHealthCheck;
