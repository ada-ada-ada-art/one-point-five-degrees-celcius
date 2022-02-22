const sentences = [
  'Global warming is likely to reach 1.5°C between 2030 and 2052 if it continues to increase at the current rate.',
  'Human-induced warming reached approximately 1°C above pre-industrial levels in 2017, increasing at 0.2°C per decade.',
  'Warming from anthropogenic emissions from the pre-industrial period to the present will persist for centuries to millennia.',
  'Warming from anthropogenic emissions will continue to cause further long-term changes in the climate system.',
  'Impacts on natural and human systems from global warming have already been observed.',
  'Many land and ocean ecosystems and some of the services they provide have already changed due to global warming.',
  'Adaptation and mitigation are already occurring.',
  'The number of hot days is projected to increase in most land regions, with highest increases in the tropics.',
  'Sea level rise will continue beyond 2100 even if global warming is limited to 1.5°C in the 21st century.',
  'Sea level will continue to rise well beyond 2100, and the magnitude and rate of this rise depend on future emission pathways.',
  'A reduction of 0.1 m in global sea level rise implies that up to 10 million fewer people would be exposed to related risks.',
  'High-latitude tundra and boreal forests are particularly at risk of climate change-induced degradation and loss, with woody shrubs already encroaching into the tundra.',
  'There is high confidence that the probability of a sea ice-free Arctic Ocean during summer is substantially lower at global warming of 1.5°C when compared to 2°C.',
  'Global warming of 1.5°C is projected to shift the ranges of many marine species to higher latitudes as well as increase the amount of damage to many ecosystems.',
  'Irreversible loss of the Greenland ice sheet could result in multi-metre rise in sea level over hundreds to thousands of years.',
  'Marine ice sheet instability in Antarctica could result in multi-metre rise in sea level over hundreds to thousands of years.',
  'Increasing warming amplifies the exposure of small islands, low-lying coastal areas and deltas to the risks associated with sea level rise.',
  'On land, impacts on biodiversity and ecosystems, including species loss and extinction, are projected to be lower at 1.5°C of global warming compared to 2°C.',
  'Lack of global cooperation is a key impediment to achieving 1.5°C pathways.',
  'Lack of governance of the required energy and land transformation is a key impediment to achieving 1.5°C pathways.',
  'Increases in resource-intensive consumption are key impediments to achieving 1.5°C pathways.',
  'Under emissions in line with current pledges under the Paris Agreement, global warming is expected to surpass 1.5°C above pre-industrial levels.',
  'Lower GHG emissions in 2030 lead to a higher chance of keeping peak warming to 1.5°C.',
  'Limiting warming to 1.5°C implies deep reductions in emissions of non-CO2 forcers, particularly methane.',
  '1.5°C mitigation pathways are characterized by energy-demand reductions, decarbonization of electricity and other fuels, and electrification of energy end use.',
  '1.5°C mitigation pathways are characterized by deep reductions in agricultural emissions.',
  '1.5°C implies very ambitious, internationally cooperative policy environments that transform both supply and demand.',
  'Policies reflecting a high price on emissions are necessary in models to achieve cost-effective 1.5°C pathways.',
  'Limiting warming to 1.5°C requires a marked shift in investment patterns.',
  'The evolution of methane and sulphur dioxide emissions strongly influences the chances of limiting warming to 1.5°C.',
  'Pathways limiting warming to 1.5°C with no or limited overshoot use carbon dioxide removal to some extent to neutralize emissions from sources for which no mitigation measures have been identified',
  'Pathways limiting warming to 1.5°C with no or limited overshoot use carbon dioxide removal to achieve net negative emissions to return global warming to 1.5°C following a peak.',
  'Limits to our understanding of how the carbon cycle responds to net negative emissions increase the uncertainty about the effectiveness of carbon dioxide removal to decline temperatures after a peak.',
  'Carbon dioxide removal deployed at scale is unproven, and reliance on such technology is a major risk in the ability to limit warming to 1.5°C.',
  'Lifestyle choices lowering energy demand and the land- and GHG-intensity of food consumption can further support achievement of 1.5°C pathways.',
  'Limiting warming to 1.5°C can be achieved synergistically with poverty alleviation and improved energy security.',
  'Limiting warming to 1.5°C can provide large public health benefits through improved air quality, preventing millions of premature deaths.',
  'Warming greater than the global average has already been experienced in many regions and seasons, with higher average warming over land than over the ocean.',
  'Many of the impacts of warming up to and beyond 1.5°C fall disproportionately on the poor and vulnerable.',
  'Some potential impacts of mitigation actions required to limit warming to 1.5°C fall disproportionately on the poor and vulnerable.',
  'The global transformation that would be needed to limit warming to 1.5°C requires geophysical, environmental-ecological, technological, economic, socio-cultural and institutional change.',
  'Some risks may be long-lasting and irreversible, such as the loss of some ecosystems.',
  'If overshoot is to be minimized, large, immediate and unprecedented global efforts to mitigate greenhouse gases are required.',
  'Limiting global warming to 1.5°C would limit risks of increases in heavy precipitation events on a global scale.',
  'Limiting global warming to 1.5°C is expected to substantially reduce the probability of extreme drought, precipitation deficits, and risks associated with water availability.',
  'The ocean has absorbed about 30% of the anthropogenic carbon dioxide, resulting in ocean acidification and changes to carbonate chemistry that are unprecedented for at least the last 65 million years.',
  'There are multiple lines of evidence that ocean warming and acidification corresponding to 1.5°C of global warming would impact sectors such as aquaculture and fisheries.',
  'There are multiple lines of evidence that ocean warming and acidification corresponding to 1.5°C of global warming would impact a wide range of marine organisms and ecosystems.',
  'Risks associated with factors, such as forest fires, extreme weather events, and the spread of invasive species, pests and diseases, would be lower at 1.5°C than at 2°C of warming.',
  'Constraining global warming to 1.5°C, rather than to 2°C and higher, is projected to have many benefits for terrestrial and wetland ecosystems and for the preservation of their services to humans.',
  'Multiple lines of evidence indicate that 70–90% of warm water coral reefs that exist today will disappear even if global warming is constrained to 1.5°C.',
  'Reductions in projected food availability are larger at 2°C than at 1.5°C of global warming in the Sahel, southern Africa, the Mediterranean, central Europe and the Amazon.',
  'Fisheries and aquaculture are important to global food security but are already facing increasing risks from ocean warming and acidification.',
  'Land use and land-use change emerge as critical features of virtually all mitigation pathways that seek to limit global warming to 1.5°C.',
  'Any increase in global temperature is projected to affect human health, with primarily negative consequences.',
  'Lower risks are projected at 1.5°C than at 2°C for heat-related morbidity and mortality.',
  'Global warming of 2°C is expected to pose greater risks to urban areas than global warming of 1.5°C.',
  'Poverty and disadvantage have increased with recent warming and are expected to increase for many populations as average global temperatures increase from 1°C to 1.5°C and higher.',
  'Existing and restored natural coastal ecosystems may be effective in reducing the adverse impacts of rising sea levels and intensifying storms by protecting coastal and deltaic regions.',
  'Coral reefs are projected to decline by a further 70–90% at 1.5°C, with >99% losses at 2°C.',
  'Climate-related risks to health, livelihoods, food security, water supply, human security, and economic growth are projected to increase with global warming of 1.5°C and increase further with 2°C.',
  'Populations at disproportionately higher risk of adverse consequences with global warming of 1.5°C and beyond include disadvantaged and vulnerable populations.',
  'Populations at disproportionately higher risk of adverse consequences with global warming of 1.5°C and beyond include some indigenous peoples.',
  'Populations at disproportionately higher risk of adverse consequences with global warming of 1.5°C and beyond include local communities dependent on agricultural or coastal livelihoods.',
  'Limiting global warming to 1.5°C, compared with 2°C, could reduce the number of people both exposed to climate-related risks and susceptible to poverty by up to several hundred million by 2050.',
  'Poverty and disadvantage are expected to increase in some populations as global warming increases.',
  'Risks from some vector-borne diseases, such as malaria and dengue fever, are projected to increase with warming from 1.5°C to 2°C, including potential shifts in their geographic range.',
  'Limiting warming to 1.5°C compared with 2°C is projected to result in smaller net reductions in yields of maize, rice, wheat, and potentially other cereal crops.',
  'Livestock are projected to be adversely affected with rising temperatures, depending on the extent of changes in feed quality, spread of diseases, and water resource availability.',
  'Countries in the tropics and Southern Hemisphere subtropics are projected to experience the largest impacts on economic growth due to climate change.',
  'For global warming from 1.5°C to 2°C, risks across energy, food, and water sectors could overlap spatially and temporally, creating new and exacerbating current hazards, exposures.',
  'There are limits to adaptation and adaptive capacity for some human and natural systems at global warming of 1.5°C.',
  'Adaptation is expected to be more challenging for ecosystems, food and health systems at 2°C of global warming than for 1.5°C.',
  'Modelled pathways that limit global warming to 1.5°C with no or limited overshoot involve deep reductions in emissions of methane and black carbon.',
  'Improved air quality resulting from projected reductions in many non-CO2 emissions provide direct and immediate population health benefits in all 1.5°C model pathways.',
  'The implementation of land-based mitigation options would require overcoming socio-economic, institutional, technological, financing and environmental barriers that differ across regions.',
  'Very few countries, regions, cities, communities or businesses can currently claim to demonstrate implementation consistent with 1.5°C pathways.',
  'Limiting warming to 1.5°C above pre-industrial levels would require transformative systemic change, integrated with sustainable development.',
  'Systemic change would need to be linked to complementary adaptation actions, including transformational adaptation, especially for pathways that temporarily overshoot 1.5°C.',
  'Current national pledges on mitigation and adaptation are not enough to stay below the Paris Agreement temperature limits and achieve its adaptation goals.',
  'Additional local, national and international resources would need to be mobilized in developing countries and for poor and vulnerable people.',
  'Public, financial, institutional and innovation capabilities currently fall short of implementing far-reaching measures at scale in all countries.',
  'Transnational networks that support multilevel climate action are growing, but challenges in their scale-up remain.',
  'Drawing on bottom-up approaches and using indigenous knowledge would effectively engage and protect vulnerable people and communities.',
  'While adaptation finance has increased quantitatively, significant further expansion would be needed to adapt to 1.5°C.',
  'The political, economic, social and technical feasibility of solar energy, wind energy and electricity storage technologies has improved dramatically over the past few years',
  'Changing agricultural practices can be an effective climate adaptation strategy.',
  'Shifts in dietary choices towards foods with lower emissions and requirements for land, along with reduced food loss and waste, could reduce emissions and increase adaptation options.',
  'Improving the efficiency of food production and closing yield gaps have the potential to reduce emissions from agriculture, reduce pressure on land, and enhance food security.',
  'Decreasing food loss and waste and changing dietary behaviour could result in significant co-benefits for food security, human health and sustainable development.',
  'Evidence of successful policies to modify dietary choices remains limited.',
  'A mix of mitigation and adaptation options implemented in a participatory and integrated manner can enable rapid, systemic transitions in urban and rural areas.',
  'Various mitigation options are expanding rapidly across many geographies, although not all income groups have so far benefited from them.',
  'Other rapid changes needed in urban environments include demotorization and decarbonization of transport.',
  'Feasible adaptation options include green infrastructure, resilient water and urban ecosystem services, urban and peri-urban agriculture.',
  'Though CO2 dominates long-term warming, the reduction of warming short-lived climate forcers, such as methane and black carbon, can in the short term contribute significantly to limiting warming.',
  'At the local scale, soil carbon sequestration has co-benefits with agriculture and is cost-effective even without climate policy.',
  'To reduce inequality and alleviate poverty, transformations would require more planning and stronger institutions than observed in the past, including inclusive markets.',
  'The rapid and far-reaching response required to keep warming below 1.5°C requires large increases of investments in low-emission infrastructure and buildings.',
  'The rapid and far-reaching response required to keep warming below 1.5°C requires a redirection of financial flows towards low-emission investments.',
  'Embedded in consistent policy packages, carbon pricing can help mobilize incremental resources and provide flexible mechanisms that help reduce social and economic costs.',
  'A climate-sensitive realignment of savings and expenditure towards low-emission, climate-resilient infrastructure and services requires an evolution of global and national financial systems.',
  'Knowledge gaps around implementing and strengthening the global response to climate change would need to be urgently resolved if the transition to a 1.5°C world is to become reality.',
  'Limiting global warming to 1.5°C rather than 2°C could reduce the number of people exposed to climate risks and vulnerable to poverty by 62 to 457 million.',
  'Limiting global warming to 1.5°C rather than 2°C could lessen the risks of poor people to experience food and water insecurity, adverse health impacts, and economic losses.',
  'Some of the worst impacts are expected to be felt among agricultural and coastal dependent livelihoods, indigenous people, children and the elderly.',
  'Some of the worst impacts are expected to be felt among poor labourers, poor urban dwellers in African cities, and people and ecosystems in the Arctic and Small Island Developing States.',
  'Synergies between adaptation strategies and the Sustainable Development Goals are expected to hold true in a 1.5°C warmer world, across sectors and contexts.',
  'Ecosystem- and community-based adaptation, along with the incorporation of indigenous and local knowledge, advances synergies with gender equality, reducing inequalities and inclusive societies.',
  'Adaptation strategies can result in trade-offs with and among the Sustainable Development Goals.',
  'Pursuing place-specific adaptation pathways towards a 1.5°C warmer world has the potential for significant positive outcomes for well-being in countries at all levels of development.',
  'Positive outcomes emerge when adaptation pathways ensure a diversity of adaptation options based on people’s values and the trade-offs they consider acceptable.',
  'Positive outcomes emerge when adaptation pathways maximize synergies with sustainable development through inclusive, participatory and deliberative processes.',
  'Positive outcomes emerge when adaptation pathways facilitate equitable transformation.',
  'Pathways compatible with 1.5°C that feature low energy demand show the most pronounced synergies with respect to sustainable development.',
  'Redistributive policies that shield the poor and vulnerable can resolve trade-offs for a range of Sustainable Development Goals.',
  'Mitigation consistent with 1.5°C of warming create high risks for sustainable development in countries with high dependency on fossil fuels for revenue and employment generation.',
  'Targeted policies that promote diversification of the economy and the energy sector could ease the transition in countries with high dependency on fossil fuels.',
  'Development pathways with high fragmentation, inequality and poverty are associated with comparatively higher mitigation and adaptation challenges.',
  'No pathway in the literature integrates or achieves all 17 Sustainable Development Goals.',
  'Without societal transformation and rapid implementation of ambitious greenhouse gas reduction measures, pathways will be exceedingly difficult, if not impossible, to achieve.',
  'Limiting warming to 1.5°C would require all countries and non-state actors to strengthen their contributions without delay.',
  'Limiting warming can be achieved through sharing efforts based on bolder and more committed cooperation, with support for those with the least capacity to adapt, mitigate and transform.',
  'Social justice and equity are core aspects of climate-resilient development pathways for transformational social change.',
  'Identifying and navigating inclusive and socially acceptable pathways towards low-carbon, climate-resilient futures is a challenging yet important endeavour.',
  'Pathways that encompass joint, iterative planning and transformative visions show potential for liveable and sustainable futures.',
  'Attention to power asymmetries and unequal opportunities for development, among and within countries, is key to adopting 1.5°C-compatible development pathways that benefit all populations.',
  'Re-examining individual and collective values could help spur urgent, ambitious and cooperative change.'
]
