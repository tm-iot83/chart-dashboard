import { useState, useEffect } from "react"
import type { ChartProps } from "../../data/mockChartData"

function ChartForm({
  config,
  onSave
}: {
  config: ChartProps
  onSave?: (config: ChartProps) => void
}) {
  const [formData, setFormData] = useState<ChartProps>(config)

  useEffect(() => {
    setFormData(config)
  }, [config])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onSave?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="chart-form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Color (Hex)</label>
        <input
          type="text"
          value={formData.hexColor || ''}
          onChange={(e) => setFormData({ ...formData, hexColor: e.target.value })}
          className="form-input"
          placeholder="#000000"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Chart Type</label>
        <select
          value={formData.type || 'line'}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as 'line' | 'bar' | 'area' })
          }
          className="form-input"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="area">Area</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="button-primary">
          Save
        </button>
      </div>
    </form>
  )
}

export default ChartForm