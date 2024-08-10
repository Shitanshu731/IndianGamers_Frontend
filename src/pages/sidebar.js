import React from 'react'
import styles from "../styles/Home.module.css";
import { Checkbox, Radio } from "antd";
function sidebar() {

    const handleFilter = async (value, id) => {
        let all = [...checked];
        if (value) {
          all.push(id);
        } else {
          all = all.filter((c) => c !== id);
        }
        setChecked(all);
      };
      
  return (
    <>
    <div className={styles.sidebar}>
          <h4>Filter By Cateogory</h4>
          <div className={styles.checkbox_radio}>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className={styles.checkbox}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4>Filter By Prices</h4>
          <div className={styles.checkbox_radio}>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio className={styles.radio} value={p.array}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="m-3 w-28">
            <button
              className={styles.button}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
    </>
  )
}

export default sidebar
