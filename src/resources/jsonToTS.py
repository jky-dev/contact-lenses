if __name__ == "__main__":
  f = open('./multifocal.json', 'r')
  out = open('./multifocal.ts', 'w+')
  for line in f:
    if ":" not in line:
      out.write(line)
      print(line)
    else:
      if '"": ""' in line or '"__1": ""' in line:
        print('skipped')
        continue
      split = line.split(':', 1)
      line = split[0].replace('"', '').replace(' ', '').replace('Dk/t', 'Dkt') + ':' + split[1].replace('"', '\'')
      out.write(line)
      print(line)

