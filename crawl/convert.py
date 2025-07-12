import json
import pandas as pd

# 转换为指定的格式
result = []
for index, row in data.iterrows():
    item = {
        "name": row['思绪名'],
        "rank": row['等级'],
        "attribute": row['属性'],
        "chapter": row['篇章'],
        "method": row['获取方式'] if pd.notnull(row['获取方式']) else "无",
        "date": row['上线时间'] if pd.notnull(row['上线时间']) else "无"
    }
    result.append(item)

# 将结果保存为 JSON 文件
json_path = '/mnt/data_converted.json'
with open(json_path, 'w', encoding='utf-8') as file:
    json.dump(result, file, ensure_ascii=False, indent=4)