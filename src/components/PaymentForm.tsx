import { FormEvent, useState } from "react"
import { IPayment, TCategory } from "../types"
import { todayISO } from "../format"
import { nanoid } from "nanoid"
import { usePaymentsStore } from "../store"
import { CATEGORY_LABELS, CATEGORYS_LIST } from "../categories"

export default function PaymentForm() {
    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [due, setDue] = useState<string>(todayISO())
    const [category, setcategory] = useState<TCategory>('video')
    const [error] = useState<string>('')
    const { addPayment } = usePaymentsStore()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !amount.trim()) return


    const newExpense: IPayment = {
    id: nanoid(),
    title,
    amount: Number(amount),
    due,
    category,
    paid: false

    }
    addPayment(newExpense)
    setTitle("")
    setAmount("")
  }

    return (
        <form className="box" onSubmit={handleSubmit}>
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    value={title}
                    placeholder="Например, Figma"
                    maxLength={60}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input type="text" inputMode="decimal"
                        value={amount}
                        required
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <label className="field">
                    <span>Оплатить до</span>
                    <input type="date"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                    />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select value={category} onChange={(e) => setcategory(e.target.value as TCategory)}>

                    {CATEGORYS_LIST.map((cat) => (
                        <option key={cat} value={cat}>
                            {CATEGORY_LABELS[cat]}
                        </option>
                    ))}
                </select>
            </label>

            {error && (
                <p className="error" role="alert">
                    {error}
                </p>)}

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    )
}
