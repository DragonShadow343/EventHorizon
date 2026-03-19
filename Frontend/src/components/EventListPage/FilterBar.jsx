const FilterBar = ({ className }) => {
    return (
        <>
            <div className={`flex flex-col shadow-xl w-60 h-fit m-6 p-6 items-start bg-blue-200 text-black rounded-2xl ${className}`}>
                <h1 className={`text-2xl font-semibold ${className}`}>Filters</h1>
                <form className={'flex flex-col gap-4 mt-4'}>
                    {/* Date filter options */}
                    <label className={'font-semibold'}>Date:</label>
                    <ul>
                        <li><label><input type="checkbox" value="today"/> Today</label></li>
                        <li><label><input type="checkbox" value="tomorrow"/> Tomorrow</label></li>
                        <li><label><input type="checkbox" value="this-week"/> This Week</label></li>
                        <li><label><input type="checkbox" value="this-month"/> This Month</label></li>
                    </ul>
                    
                    {/* Category filter options */}
                    <label className={'font-semibold'}>Category:</label>
                    <ul>
                        <li><label><input type="checkbox" value="business"/> Business</label></li>
                        <li><label><input type="checkbox" value="sports"/> Sports</label></li>
                        <li><label><input type="checkbox" value="food"/> Food</label></li>
                        <li><label><input type="checkbox" value="technology"/> Technology</label></li>
                        <li><label><input type="checkbox" value="networking"/> Networking</label></li>
                        <li><label><input type="checkbox" value="social"/> Social</label></li>
                        <li><label><input type="checkbox" value="music"/> Music</label></li>
                        <li><label><input type="checkbox" value="arts-and-crafts"/> Arts and Crafts</label></li>
                        <li><label><input type="checkbox" value="health-and-wellness"/> Health and Wellness</label></li>
                        <li><label><input type="checkbox" value="education"/> Education</label></li>
                        <li><label><input type="checkbox" value="charity"/> Charity</label></li>
                        <li><label><input type="checkbox" value="other"/> Other</label></li>
                    </ul>

                    {/* Rating filter options */}
                    <label className={'font-semibold'}>Rating:</label>
                    <ul>
                        <li><label><input type="checkbox" value="5"/> 5 Stars</label></li>
                        <li><label><input type="checkbox" value="4"/> 4 Stars</label></li>
                        <li><label><input type="checkbox" value="3"/> 3 Stars</label></li>
                    </ul>
                </form>
            </div>
        </>
    )
}

export default FilterBar
