#!/bin/bash
cd /home/node/.openclaw/workspace/asianbus-temp

# Author assignments based on article topics
# Selena Jung — Charts, album sales, streaming records, music industry analysis
# Andrew Lewter — TV appearances, variety shows, interviews, award shows, events
# Julian Choi — Breaking news, controversies, legal issues, scandals, agency statements
# Chloe Nam-Davis — Solo debuts, cultural milestones, Western crossovers, fashion/trends
# Brandon Lee — Business stories, touring, agency news, debuts, corporate moves
# Michael Finley — Fan culture, fandom reactions, concert experiences, community stories
# Grace Kim — K-drama news, acting roles, OSTs, lifestyle, personal life stories

declare -A AUTHOR_MAP

# Already correctly assigned (core authors matching beats) - verify and keep
# article1 - ENHYPEN crisis/departure - breaking news
AUTHOR_MAP[article1]="Julian Choi"
# article2 - BTS Jungkook personality debate among fans
AUTHOR_MAP[article2]="Michael Finley"
# article3 - Tiffany wedding ring - personal life
AUTHOR_MAP[article3]="Grace Kim"
# article4 - ILLIT plagiarism accusations - fan culture/fandom reactions
AUTHOR_MAP[article4]="Michael Finley"
# article5 - Cha Eunwoo tax evasion scandal
AUTHOR_MAP[article5]="Julian Choi"
# article6 - Oscar controversy
AUTHOR_MAP[article6]="Julian Choi"
# article7 - BTS concert bomb threats - breaking news/security
AUTHOR_MAP[article7]="Julian Choi"
# article8 - LE SSERAFIM uncomfortable fan event - controversy
AUTHOR_MAP[article8]="Julian Choi"
# article9 - Dating rumors
AUTHOR_MAP[article9]="Grace Kim"
# article10 - TREASURE criticism - controversy
AUTHOR_MAP[article10]="Julian Choi"
# article11 - NCT Taeyong accused of misogyny
AUTHOR_MAP[article11]="Julian Choi"
# article12 - ILLIT visuals mocked - fan culture controversy
AUTHOR_MAP[article12]="Julian Choi"
# article13 - Chungha retiring - personal life/lifestyle
AUTHOR_MAP[article13]="Grace Kim"
# article14 - Idol on NDAs and dating - interview
AUTHOR_MAP[article14]="Andrew Lewter"
# article15 - BTS new title track first look - music
AUTHOR_MAP[article15]="Selena Jung"
# article16 - BTS accused of profiting from favoritism - controversy
AUTHOR_MAP[article16]="Julian Choi"
# article17 - Idol honest about fake personality - interview
AUTHOR_MAP[article17]="Andrew Lewter"
# article18 - aespa Winter couple tattoo backlash - controversy
AUTHOR_MAP[article18]="Julian Choi"
# article19 - IVE Rei on pricey merch criticism - fan culture
AUTHOR_MAP[article19]="Michael Finley"
# article20 - ZEROBASEONE song choice divided reactions - fan culture
AUTHOR_MAP[article20]="Michael Finley"
# article21 - Lee Dong Hwi cuts ties - scandal
AUTHOR_MAP[article21]="Julian Choi"
# article22 - K-Drama boycott - K-drama news
AUTHOR_MAP[article22]="Grace Kim"
# article23 - Choi Yena weight loss - lifestyle/personal
AUTHOR_MAP[article23]="Grace Kim"
# article24 - RIIZE fan robbed at concert - fan culture
AUTHOR_MAP[article24]="Michael Finley"
# article25 - HYBE member terrorized by sasaengs - breaking news/controversy
AUTHOR_MAP[article25]="Julian Choi"
# article26 - Lovelyz Mijoo backlash grilling on balcony - controversy/personal life
AUTHOR_MAP[article26]="Grace Kim"
# article27 - BLACKPINK music show win fraud accusations - controversy
AUTHOR_MAP[article27]="Julian Choi"
# article28 - IVE Yujin dating rumors - personal life
AUTHOR_MAP[article28]="Grace Kim"
# article29 - KATSEYE shading during performance - event
AUTHOR_MAP[article29]="Andrew Lewter"
# article30 - Former idol on debut debt - industry/breaking
AUTHOR_MAP[article30]="Julian Choi"
# article31 - ZEROBASEONE split, new group ANDOUBLE debut - business/debuts
AUTHOR_MAP[article31]="Brandon Lee"
# article32 - National Pension Service flooded over ENHYPEN - fan culture
AUTHOR_MAP[article32]="Michael Finley"
# article33 - SEVENTEEN album sales fraud allegations - controversy/business
AUTHOR_MAP[article33]="Julian Choi"
# article34 - Girls' Generation Tiffany wedding - personal life
AUTHOR_MAP[article34]="Grace Kim"
# article35 - Cha Eunwoo Netflix drama + tax scandal - K-drama/scandal
AUTHOR_MAP[article35]="Grace Kim"
# article36 - TWICE Jeongyeon mistreatment allegations - controversy
AUTHOR_MAP[article36]="Julian Choi"
# article37 - Lee Dong Hwi cuts ties with Mino - scandal
AUTHOR_MAP[article37]="Julian Choi"
# article38 - BTS ARIRANG album drops tomorrow - music
AUTHOR_MAP[article38]="Selena Jung"
# article39 - Seoul red lights political firestorm, HYBE denies - business/controversy
AUTHOR_MAP[article39]="Julian Choi"
# article40 - THE BOYZ contract termination allegations - legal/controversy
AUTHOR_MAP[article40]="Julian Choi"
# article41 - Seoul terror alert for BTS concert - breaking news/event
AUTHOR_MAP[article41]="Julian Choi"
# article42 - ZEROBASEONE members debut new group - business/debuts
AUTHOR_MAP[article42]="Brandon Lee"
# article43 - Netflix concert tour - business/entertainment
AUTHOR_MAP[article43]="Brandon Lee"
# article44 - Rookie boy group debut - debuts
AUTHOR_MAP[article44]="Brandon Lee"
# article45 - IU K-Drama premiere - K-drama
AUTHOR_MAP[article45]="Grace Kim"
# article46 - Siren's Kiss drama guide - K-drama
AUTHOR_MAP[article46]="Grace Kim"
# article47 - Seo Kang Joon drama confirmed - K-drama
AUTHOR_MAP[article47]="Grace Kim"
# article48 - BTS ARIRANG album breakdown - music
AUTHOR_MAP[article48]="Selena Jung"
# article49 - K-Pop fans crash pension fund - fan culture
AUTHOR_MAP[article49]="Michael Finley"
# article50 - BLACKPINK Jennie headline Lollapalooza - Western crossover/milestone
AUTHOR_MAP[article50]="Chloe Nam-Davis"
# article51 - BLACKPINK Jisoo drama #1 Netflix - K-drama
AUTHOR_MAP[article51]="Grace Kim"
# article52 - BTS SWIM music video breaks YouTube records - streaming/charts
AUTHOR_MAP[article52]="Selena Jung"
# article53 - Netflix concert tour - business
AUTHOR_MAP[article53]="Brandon Lee"
# article54 - THE BOYZ contract war escalates - legal/controversy
AUTHOR_MAP[article54]="Julian Choi"
# article55 - Seoul shuts down for BTS concert - concert/event
AUTHOR_MAP[article55]="Andrew Lewter"
# article56 - BTS ARIRANG album review, 4M copies - music/sales
AUTHOR_MAP[article56]="Selena Jung"
# article57 - Fans crash pension fund (dupe of 49) - fan culture
AUTHOR_MAP[article57]="Michael Finley"
# article58 - TWICE Dahyun miss concerts, JYP statement - agency statement/news
AUTHOR_MAP[article58]="Julian Choi"
# article59 - Geopolitics threatens K-Pop Japanese members - breaking news/industry
AUTHOR_MAP[article59]="Julian Choi"
# article60 - BTS ARIRANG auto-tune debate - fan culture/music debate
AUTHOR_MAP[article60]="Michael Finley"
# article61 - Park Na Rae police probe abuse case - legal/controversy
AUTHOR_MAP[article61]="Julian Choi"
# article62 - BTS historic comeback 260K fans - concert/event
AUTHOR_MAP[article62]="Andrew Lewter"
# article63 - BTS 104K fans concert - concert/event
AUTHOR_MAP[article63]="Andrew Lewter"
# article64 - BTS ARIRANG shatters records 3.98M sales - charts/sales
AUTHOR_MAP[article64]="Selena Jung"
# article65 - P1Harmony career-best 500K first-week sales - charts/sales
AUTHOR_MAP[article65]="Selena Jung"
# article66 - SEVENTEEN Vernon/The8 sub-unit announce - debuts/agency
AUTHOR_MAP[article66]="Brandon Lee"
# article67 - IU K-Drama April premiere - K-drama
AUTHOR_MAP[article67]="Grace Kim"
# article68 - Kim Seon-ho drama dominates charts - K-drama
AUTHOR_MAP[article68]="Grace Kim"
# article69 - Jungkook/Winter dating rumors - personal life/dating
AUTHOR_MAP[article69]="Grace Kim"
# article70 - Police security at BTS concert - breaking news
AUTHOR_MAP[article70]="Julian Choi"
# article71 - Former Cube idols expose trainee culture - controversy/exposé
AUTHOR_MAP[article71]="Julian Choi"
# article72 - BTS ARIRANG 4M copies record - charts/sales
AUTHOR_MAP[article72]="Selena Jung"
# article73 - ITZY Yuna solo career launch - solo debut
AUTHOR_MAP[article73]="Chloe Nam-Davis"
# article74 - Kim Se-jeong leaves agency - agency news/business
AUTHOR_MAP[article74]="Brandon Lee"
# article75 - Netflix BTS documentary - entertainment/TV
AUTHOR_MAP[article75]="Andrew Lewter"
# article76 - HYBE shares plunge - business
AUTHOR_MAP[article76]="Brandon Lee"
# article77 - SEVENTEEN world tour numbers - touring
AUTHOR_MAP[article77]="Brandon Lee"
# article78 - BTS RM NYC promotions on crutches - event/interview
AUTHOR_MAP[article78]="Andrew Lewter"
# article79 - Actress Hyeri pregnancy - personal life
AUTHOR_MAP[article79]="Grace Kim"
# article80 - Stray Kids anniversary single for fans - fan culture
AUTHOR_MAP[article80]="Michael Finley"
# article81 - Phantom Lawyer overtakes BTS on Netflix - K-drama
AUTHOR_MAP[article81]="Grace Kim"
# article82 - BLACKPINK Jisoo acting debut reviews - K-drama/acting
AUTHOR_MAP[article82]="Grace Kim"
# article83 - Min Heejin vindicated, HYBE criticism - business/controversy
AUTHOR_MAP[article83]="Brandon Lee"
# article84 - SEVENTEEN Vernon/The8 new unit - debuts/business
AUTHOR_MAP[article84]="Brandon Lee"
# article85 - SM sasaeng warning - agency statement/breaking
AUTHOR_MAP[article85]="Julian Choi"
# article86 - BTS on Jimmy Fallon + Spotify records - TV appearance + charts (TV primary)
AUTHOR_MAP[article86]="Andrew Lewter"
# article87 - MAMA Awards confirmed Osaka - events/business
AUTHOR_MAP[article87]="Brandon Lee"
# article88 - BTS SWIM #1 Billboard, ARIRANG top 9 - charts
AUTHOR_MAP[article88]="Selena Jung"
# article89 - BLACKPINK Lisa Las Vegas residency - solo/milestone/cultural
AUTHOR_MAP[article89]="Chloe Nam-Davis"
# article90 - BTS Billboard sweep - charts
AUTHOR_MAP[article90]="Selena Jung"

# Process each article
for i in $(seq 1 90); do
    f="article${i}.html"
    if [ ! -f "$f" ]; then
        echo "SKIP: $f not found"
        continue
    fi
    
    author="${AUTHOR_MAP[article${i}]}"
    if [ -z "$author" ]; then
        echo "ERROR: No author assigned for $f"
        continue
    fi
    
    # Replace author in span tag
    sed -i "s|<span class=\"author\">By [^<]*</span>|<span class=\"author\">By ${author}</span>|g" "$f"
    
    # Replace author in JSON-LD (only the line after "@type": "Person")
    sed -i '/"@type": "Person"/{ n; s/"name": "[^"]*"/"name": "'"${author}"'"/; }' "$f"
    
    echo "OK: $f -> ${author}"
done

echo ""
echo "=== Fixing broken articles (84, 85, 87) - missing author spans ==="
