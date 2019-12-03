import csv

with open('data.csv', newline='\n') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    iterator = 0
    year = 2017
    for row in spamreader:
        if(len(row) == 1):
            if(iterator == 0):
                year = 2017 
            else: 
                year = row[0]
        else:
            period = row[0]
            total =  row[1]
            men =  row[2]
            woman =  row[3]

            res = 'mutation create'+str(iterator)+'{\n'
            res = res + '\ncreateUnemployment(input:{'
            res = res + '\n\tperiod: "' + period +'"'
            res = res + '\n\tyear: "' + str(year)+'"'
            res = res + '\n\ttotal:' + total
            res = res + '\n\tmen:' + men
            res = res + '\n\twomen:' + woman
            res = res + '\n}){'
            res = res + '  \n\t\tperiod year total men women'
            res = res + '\n}'
            res = res + '\n}'        
            iterator = iterator + 1
            print(res)