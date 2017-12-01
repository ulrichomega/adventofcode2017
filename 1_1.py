import sys

def main():
    with open(sys.argv[1]) as input:
        contents = input.read().strip()
    print(contents)
    total=0

    for x in range(-1,len(contents)-2):
        first = contents[x]
        second = contents[x+1]
        #print ("comparing {first} and {second}".format(first=first,second=second))
        if first == second:
            total = total + int(first)
            #print ("match: Total is: {total}".format(total=total))

    print(total)

if __name__ == "__main__":
    main()