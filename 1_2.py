import sys

def main():
    with open(sys.argv[1]) as input:
        contents = input.read().strip()
    print(contents)
    total=0

    for x in range(0, len(contents)):
        first = contents[x]
        second = contents[int(x-len(contents)/2)]
        if first == second:
            total = total + int(first)

    print(total)

if __name__ == "__main__":
    main()