import { CATEGORY_LABELS, CATEGORYS_LIST } from "../categories"
import { formatMoney } from "../format"
import { usePaymentsStore } from "../store"
import { TCategory } from "../types"

interface Row {
    category: TCategory
    count: number
    paidCount: number
    total: number
    due: number
}

export default function CategoriesPage() {

    const items = usePaymentsStore((state) => state.items)

    const rows: Row[] = CATEGORYS_LIST.map(key => {
        const categoryItems = items.filter(el => el.category === key)
        return {
            category: key,
            count: categoryItems.length,
            paidCount: categoryItems.filter((el) => el.paid).length,
            total: categoryItems.reduce((acc, v) => acc + v.amount, 0),
            due: categoryItems.filter((el) => !el.paid)
            .reduce((acc, v) => acc + v.amount, 0)
        }
    })
    .filter(r => r.count > 0)
    .sort((a, b) => a.total - b.total)


    return (
        
        <ul className="list">
            {rows.map((r) => (
                <li key={r.category} className="cat">
                    <div className={`cat__head ${r.category}`}>
                        <span>{CATEGORY_LABELS[r.category]}</span>
                        <span>{r.count} шт.</span>
                    </div>
                    <div className="cat__body">
                        <p className="cat__total">{formatMoney(r.total)}</p>
                        <div className="meter" aria-hidden="true">
                            <i
                                style={{
                                    width: `${((r.total - r.due) / r.total) * 100}%`,
                                }}
                            />
                        </div>
                        <p className="row">
                            <span>Оплачено</span>
                            <b>
                                {r.paidCount} из {r.count}
                            </b>
                        </p>
                        <p className="row">
                            <span>К оплате</span>
                            <b>{formatMoney(r.due)}</b>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
